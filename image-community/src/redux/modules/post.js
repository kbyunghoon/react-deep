import { createAction, handleActions } from "redux-actions"
import { produce } from "immer";
import { firestore } from "../../shared/firebase";
import moment from "moment";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";

const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));

const initialState = {
    list: [],
}

const initialPost = {
    // id: 0,
    // user_info: {
    //     user_name: "hoon",
    //     user_profile:
    //         "https://cdn.discordapp.com/attachments/578800402036949002/825716597414035517/e.jpg",
    // },
    image_url:
        "https://cdn.discordapp.com/attachments/578800402036949002/825716597414035517/e.jpg",
    contents: "이미지",
    comment_cnt: 0,
    insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
}
const addPostFB = (contents = ",") => {
    return function (dispatch, getState, { history }) {
        const postDB = firestore.collection("post");
        const _user = getState().user.user;

        const user_info = {
            user_name: _user.user_name,
            user_id: _user.uid,
            user_profile: _user.user_profile
        }

        const _post = {
            ...initialPost,
            contents: contents,
            insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
        };
        postDB.add({ ...user_info, ..._post }).then((doc) => {
            let post = { user_info, ..._post, id: doc.id }
            dispatch(addPost(post));
            history.replace("/");
        }).catch((err) => {
            console.log("post 작성실패", err);
        });
    }
}


const getPostFB = () => {
    let post_list = [];
    return function (dispatch, getstate, { history }) {
        const postDB = firestore.collection('post');
        postDB.get().then((docs) => {
            docs.forEach((doc) => {
                let _post = doc.data();
                let post = Object.keys(_post).reduce((acc, cur) => {
                    if (cur.indexOf("user_") !== -1) {
                        return { ...acc, user_info: { ...acc.user_info, [cur]: _post[cur] } }
                    }
                    return { ...acc, [cur]: _post[cur] }
                }, { id: doc.id, user_info: {} });
                post_list.push(post);
            })
            dispatch(setPost(post_list));
        })
    }
}

//reducer
export default handleActions(
    {
        [SET_POST]: (state, action) => produce(state, (draft) => {
            draft.list = action.payload.post_list;
        }),

        [ADD_POST]: (state, action) => produce(state, (draft) => {
            draft.list.unshift(action.payload.post);
        })
    }, initialState
);

const actionCreators = {
    setPost,
    addPost,
    getPostFB,
    addPostFB,
}

export { actionCreators };