import React, { useEffect, useState } from "react";
import { Grid, Text, Button, Image, Input } from "../elements"
import Upload from "../shared/Upload";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post"
import { actionCreators as imageActions } from "../redux/modules/image"
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';

const PostWrite = (props) => {
    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);
    const preview = useSelector((state) => state.image.preview);
    const post_list = useSelector((state) => state.post.list);

    const post_id = props.match.params.id;
    const is_edit = post_id ? true : false;

    const { history } = props;

    let _post = is_edit ? post_list.find((p) => p.id === post_id) : null;

    const [contents, setContents] = useState(_post ? _post.contents : "");

    useEffect(() => {
        if (is_edit && !_post) {
            console.log("포스트 정보가 없음");
            history.goBack();

            return;
        }
        if (is_edit) {
            dispatch(imageActions.setPreview(_post.image_url));
        }
    }, []);

    const changeContents = (e) => {
        setContents(e.target.value);
    }

    const addPost = () => {
        dispatch(postActions.addPostFB(contents, selectedValue));
    }

    const editPost = () => {
        dispatch(postActions.editPostFB(post_id, { contents: contents, layout: selectedValue }))
    }




    const [selectedValue, setSelectedValue] = React.useState('a');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const test = () => {
        console.log(contents)
    }


    if (!is_login) {
        return (
            <Grid margin="100px 0px" padding="16px" center>
                <Text size="32px" bold>잠깐</Text>
                <Text size="16px">로그인 후에만 글을 쓸 수 있습니다.</Text>
                <Button _onClick={() => { history.replace('/'); }}>로그인 하러가기</Button>
            </Grid>
        )
    }

    return (
        <React.Fragment>
            <Grid padding="16px">
                <Text margin="0px" size="36px" bold>{is_edit ? "게시글 수정" : "게시글 작성"}</Text>
                <Upload />
                <button onClick={test} />
                <Grid textAlign="center">
                    <Grid display="inline-block" width="50%" margin="0px auto">
                        <Radio
                            checked={selectedValue === 'a'}
                            onChange={handleChange}
                            value="a"
                            name="radio-button-demo"
                            inputProps={{ 'aria-label': 'A' }}
                        />
                        <Radio
                            checked={selectedValue === 'b'}
                            onChange={handleChange}
                            value="b"
                            name="radio-button-demo"
                            inputProps={{ 'aria-label': 'B' }}
                        />
                        <Radio
                            checked={selectedValue === 'c'}
                            onChange={handleChange}
                            value="c"
                            name="radio-button-demo"
                            inputProps={{ 'aria-label': 'C' }}
                        />
                    </Grid>
                </Grid>
            </Grid>

            {/* <Grid boxShadow='5px 5px 15px rgb(0 0 0 / 90%)' border="1px solid" bdrd="20px" margin="0px 0px 10px 0px">
                <Grid>
                    <Grid padding="16px">
                        <Text margin="0px" size="24px" bold>미리보기</Text>
                    </Grid>
                </Grid>
                <Grid is_flex>
                    <Image shape="rectangle" src={preview ? preview : "http://via.placeholder.com/400x300"} />

                    <Grid padding="16px">
                        <Input value={contents} _onChange={changeContents} label="게시글 내용" placeholder="게시글 작성" multiLine />
                    </Grid>
                </Grid>
                <Grid padding="16px">
                    {is_edit ? (<Button text="게시글수정" _onClick={editPost}></Button>) : (<Button text="게시글작성" _onClick={addPost}></Button>)}
                </Grid>
            </Grid> */}


            {(selectedValue === "a") ?
                <Grid boxShadow='5px 5px 15px rgb(0 0 0 / 90%)' border="1px solid" bdrd="20px" margin="0px 0px 10px 0px" padding="5px">
                    <Grid>
                        <Grid padding="16px">
                            <Text margin="0px" size="24px" bold>미리보기a</Text>
                        </Grid>
                    </Grid>
                    <Grid>
                        <Image shape="rectangle" src={preview ? preview : "http://via.placeholder.com/400x300"} />
                        <Grid padding="16px">
                            <Input value={contents} _onChange={changeContents} label="게시글 내용" placeholder="게시글 작성" multiLine />
                        </Grid>
                    </Grid>
                    <Grid padding="16px">
                        {is_edit ? (<Button text="게시글수정" _onClick={editPost}></Button>) : (<Button text="게시글작성" _onClick={addPost}></Button>)}
                    </Grid>
                </Grid>
                :
                (selectedValue === "b") ?
                    <Grid boxShadow='5px 5px 15px rgb(0 0 0 / 90%)' border="1px solid" bdrd="20px" margin="0px 0px 10px 0px" padding="5px">
                        <Grid>
                            <Grid padding="16px">
                                <Text margin="0px" size="24px" bold>미리보기b</Text>
                            </Grid>
                        </Grid>
                        <Grid is_flex>
                            <Image shape="rectangle" src={preview ? preview : "http://via.placeholder.com/400x300"} />
                            <Grid padding="16px">
                                <Input value={contents} _onChange={changeContents} label="게시글 내용" placeholder="게시글 작성" multiLine />
                            </Grid>
                        </Grid>
                        <Grid padding="16px">
                            {is_edit ? (<Button text="게시글수정" _onClick={editPost}></Button>) : (<Button text="게시글작성" _onClick={addPost}></Button>)}
                        </Grid>
                    </Grid>
                    :
                    <Grid boxShadow='5px 5px 15px rgb(0 0 0 / 90%)' border="1px solid" bdrd="20px" margin="0px 0px 10px 0px" padding="5px">
                        <Grid>
                            <Grid padding="16px">
                                <Text margin="0px" size="24px" bold>미리보기c</Text>
                            </Grid>
                        </Grid>
                        <Grid is_flex flex_direction="row-reverse">
                            <Image shape="rectangle" src={preview ? preview : "http://via.placeholder.com/400x300"} />
                            <Grid padding="5px">
                                <Input value={contents} _onChange={changeContents} label="게시글 내용" placeholder="게시글 작성" multiLine />
                            </Grid>
                        </Grid>
                        <Grid padding="16px">
                            {is_edit ? (<Button text="게시글수정" _onClick={editPost}></Button>) : (<Button text="게시글작성" _onClick={addPost}></Button>)}
                        </Grid>
                    </Grid>
            }




            {/* <Grid boxShadow='5px 5px 15px rgb(0 0 0 / 90%)' border="1px solid" bdrd="20px" margin="0px 0px 10px 0px">
                <Grid>
                    <Grid padding="16px">
                        <Text margin="0px" size="24px" bold>미리보기</Text>
                    </Grid>
                    <Image shape="rectangle" src={preview ? preview : "http://via.placeholder.com/400x300"} />
                </Grid>
                <Grid padding="16px">
                    <Input value={contents} _onChange={changeContents} label="게시글 내용" placeholder="게시글 작성" multiLine />
                </Grid>
                <Grid padding="16px">
                    {is_edit ? (<Button text="게시글수정" _onClick={editPost}></Button>) : (<Button text="게시글작성" _onClick={addPost}></Button>)}
                </Grid>
            </Grid> */}


        </React.Fragment>
    )
}

export default PostWrite;