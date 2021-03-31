import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post.js";
import Permit from "../shared/Permit"
import { Grid } from "@material-ui/core";

const PostDetail = (props) => {
    const id = props.match.params.id;
    //현재 로그인한 계정 정보
    const user_info = useSelector((state) => state.user.user);
    const post_list = useSelector(store => store.post.list);
    const post_idx = post_list.findIndex(p => p.id === id);
    const post = post_list[post_idx];
    const dispatch = useDispatch();

    useEffect(() => {
        if (post) {
            return;
        }
        dispatch(postActions.getOnePostFB(id));
    }, [])


    return (
        <React.Fragment>
            <Grid key={id}>
                {post && <Post {...post} is_me={post.user_info.user_id === user_info?.uid} />}
            </Grid>
            <Permit>
                <CommentWrite post_id={id} />
            </Permit>
            <CommentList post_id={id} />
        </React.Fragment>
    )
}

export default PostDetail;