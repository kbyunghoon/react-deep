import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Grid, Input, Button } from "../elements"
import { actionCreators as commentActions } from "../redux/modules/comment"

const CommentWrite = (props) => {
    const dispatch = useDispatch();
    const [comment_text, setComment_text] = useState();


    const { post_id } = props;
    const onChange = (e) => {
        setComment_text(e.target.value)
    }

    const write = () => {
        console.log(comment_text)
        dispatch(commentActions.addCommentFB(post_id, comment_text));
        setComment_text("");
    }

    return (
        <React.Fragment>
            <Grid padding="16px" is_flex>
                <Input placeholder={"댓글 내용을 입력해주세요 :)"} _onChange={onChange} value={comment_text} onSubmit={write} is_submit />
                <Button width="50px" margin="0px 2px 0px 2px" _onClick={write}>작성</Button>
            </Grid>
        </React.Fragment>
    )
}

export default CommentWrite;