import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";
import "moment";
import moment from "moment";
import firebase from "firebase/app";
import { actionCreators as postActions } from "./post"

const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const SET_LIKE = "SET_LIKE";
const ADD_LIKE = "ADD_LIKE";
const DEL_LIKE = "DEL_LIKE";
const LOADING = "LOADING";

const setComment = createAction(SET_COMMENT, (post_id, comment_list) => ({ post_id, comment_list }));
const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({ post_id, comment }));
const addLike = createAction(ADD_LIKE, (post_id, like_list) => ({ post_id, like_list }));
const setLike = createAction(SET_LIKE, (post_id, like_list) => ({ post_id, like_list }));
const delLike = createAction(DEL_LIKE, (post_id) => ({ post_id }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
    list: {},
    is_loading: false,
    user: null,
    likelist: {},
};


const addCommentFB = (post_id, contents) => {
    return function (dispatch, getState, { history }) {
        const commentDB = firestore.collection("comment");
        const user_info = getState().user.user;

        let comment = {
            post_id: post_id,
            user_id: user_info.uid,
            user_name: user_info.user_name,
            user_profile: user_info.user_profile,
            contents: contents,
            insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
        }
        commentDB.add(comment).then((doc) => {
            console.log(doc.id);
            const postDB = firestore.collection("post");

            const post = getState().post.list.find(l => l.id === post_id);

            const increment = firebase.firestore.FieldValue.increment(1);

            comment = { ...comment, id: doc.id };
            postDB.doc(post_id).update({ comment_cnt: increment }).then((_post) => {
                dispatch(addComment(post_id, comment));
                if (post) {
                    dispatch(postActions.editPost(post_id, { comment_cnt: parseInt(post.comment_cnt) + 1, }));
                }
            })
        })
    }
}


const getCommentFB = (post_id = null) => {
    return function (dispatch, getState, { history }) {
        if (!post_id) {
            return;
        }
        const commentDB = firestore.collection("comment");
        commentDB.where("post_id", "==", post_id).orderBy("insert_dt", "desc").get().then((docs) => {
            let list = [];
            docs.forEach((doc) => {
                list.push({ ...doc.data(), id: doc.id });
            })
            dispatch(setComment(post_id, list));
        }).catch(err => {
            console.log('댓글 정보 로드 실패', err);
        })
    }
}

const addLikeFB = (post_id = null) => {
    return function (dispatch, getState, { history }) {
        if (!post_id) {
            return;
        }
        const user_info = getState().user.user;
        let user_id = user_info.uid;
        const likeDB = firestore.collection("like");
        console.log(user_id)
        console.log(post_id)
        let like_list = {
            post_id: post_id,
            user_id: user_id,
        }
        likeDB.add(like_list).then((doc) => {
            const postDB = firestore.collection("post");
            const post = getState().post.list.find(l => l.id === post_id);
            const increment = firebase.firestore.FieldValue.increment(1);
            like_list = { ...like_list, id: doc.id }
            // console.log(like_list)
            postDB.doc(post_id).update({ like_cnt: increment }).then(() => {
                dispatch(addLike(post_id, like_list));
                if (post) {
                    dispatch(postActions.editPost(post_id, { like_cnt: parseInt(post.like_cnt) + 1, }));
                }
            })
        })






        // likeDB.doc(user_id).set({ post_id: post_id }).then(() => {
        //     const postDB = firestore.collection("post");
        //     const post = getState().post.list.find(l => l.id === post_id);
        //     const increment = firebase.firestore.FieldValue.increment(1);

        //     postDB.doc(post_id).update({ like_cnt: increment }).then(() => {
        //         dispatch(addLike(post_id, user_id));
        //         if (post) {
        //             dispatch(postActions.editPost(post_id, { comment_cnt: parseInt(post.like_cnt) + 1, }));
        //         }
        //     })
        // }).catch(err => { console.log("에러", err) })
    }
}

const delLikeFB = (post_id = null, id) => {
    console.log(post_id, id)
    return function (dispatch, getState, { history }) {
        const likeDB = firestore.collection("like");
        likeDB.doc(id).delete().then(() => {
            const postDB = firestore.collection("post");
            const post = getState().post.list.find(l => l.id === post_id);
            const increment = firebase.firestore.FieldValue.increment(-1);
            postDB.doc(post_id).update({ like_cnt: increment }).then(() => {
                dispatch(delLike(post_id));
                if (post) {
                    dispatch(postActions.editPost(post_id, { like_cnt: parseInt(post.like_cnt) - 1, }));
                }
            })
        })
    }
}



const getLikeFB = (post_id = null, id) => {
    return function (dispatch, getState, { history }) {
        if (!post_id) {
            return;
        }
        const likeDB = firestore.collection("like");
        likeDB.where("post_id", "==", post_id).where("user_id", "==", id).get().then((docs) => {
            let list = [];
            docs.forEach((doc) => {
                list = ({ ...doc.data(), id: doc.id });
            })
            dispatch(setLike(post_id, list));
        }).catch((err) => {
            console.log("1", err)
        })
    }
}



export default handleActions(
    {
        [SET_COMMENT]: (state, action) => produce(state, (draft) => {
            draft.list[action.payload.post_id] = action.payload.comment_list;
        }),
        [ADD_COMMENT]: (state, action) => produce(state, (draft) => {
            draft.list[action.payload.post_id].unshift(action.payload.comment);
        }),
        [LOADING]: (state, action) =>
            produce(state, (draft) => {
                draft.is_loading = action.payload.is_loading;
            }),
        [ADD_LIKE]: (state, action) =>
            produce(state, (draft) => {
                draft.likelist[action.payload.post_id] = action.payload.like_list;
            }),
        [SET_LIKE]: (state, action) =>
            produce(state, (draft) => {
                draft.likelist[action.payload.post_id] = action.payload.like_list;
            }),
        [DEL_LIKE]: (state, action) =>
            produce(state, (draft) => {
                draft.likelist[action.payload.post_id] = {};
            })
    },
    initialState
);

const actionCreators = {
    getCommentFB,
    addCommentFB,
    setComment,
    addComment,
    loading,
    addLikeFB,
    delLikeFB,
    getLikeFB,
    setLike,
};

export { actionCreators };