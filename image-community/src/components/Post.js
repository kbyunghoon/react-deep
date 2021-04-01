import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { Grid, Image, Text, Button } from "../elements";
import { history } from "../redux/configureStore";
import Favorite from "@material-ui/icons/Favorite"
import FavoriteBorder from "@material-ui/icons/FavoriteBorder"
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment"
import { actionCreators as postActions } from "../redux/modules/post"


const Post = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const user_info = useSelector((state) => state.user.user);
  const like_list = useSelector(state => state.comment.likelist);
  const [likecheck, setLikecheck] = useState(false);
  const [checkid, setCheckid] = useState();


  // const what = like_list[props.id].reduce((acc, cur) => {
  //   return console.log(acc, cur)
  // });
  // const like_ = like_list.reduce((acc, cur) => {
  //   console.log(acc,cur)
  // })

  useEffect(() => {
    console.log(props)
    if (!user_info) {
      return;
    }

    if (Object.keys(like_list).length === 0) {
      dispatch(commentActions.getLikeFB(props.id, user_info.uid))
      return;
    }
    if (!like_list[props.id]) {
      return;
    }
    if (like_list[props.id].user_id === user_info.uid) {
      setLikecheck(true)
    }
  }, [like_list])



  const addlike = () => {
    dispatch(commentActions.addLikeFB(props.id))
    setLikecheck(true)
  }

  const delLike = () => {
    dispatch(commentActions.delLikeFB(like_list[props.id].post_id, like_list[props.id].id))
    setLikecheck(false)
  }




  return (
    <React.Fragment>
      <Grid boxShadow='5px 5px 15px rgb(0 0 0 / 90%)' border="1px solid" bdrd="20px" margin="0px 0px 10px 0px">
        <Grid is_flex padding="16px">
          <Grid is_flex width="auto">
            <Image shape="circle" src={props.src} />
            <Text bold>{props.user_info.user_name}</Text>
          </Grid>
          <Grid is_flex width="auto">
            <Text>{props.insert_dt}</Text>
            {props.is_me && (
              <Button
                width="auto"
                padding="4px"
                margin="4px"
                _onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  history.push(`/write/${props.id}`)
                }}
              >
                수정
              </Button>
            )}
            {props.is_me && (
              <Button
                width="auto"
                padding="4px"
                margin="4px"
                _onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (window.confirm("삭제하시겠습니까?")) {
                    dispatch(postActions.delPostFB(props.id))
                    window.alert("게시글을 삭제하였습니다.")
                  } else {
                    return;
                  };
                }}
              >
                삭제
              </Button>
            )}
          </Grid>
        </Grid>

        {props.layout === "a" ?
          <Grid>
            <Grid padding="16px">
              <Text>{props.contents}</Text>
            </Grid>
            <Grid>
              <Image shape="rectangle" src={props.image_url} />
            </Grid>
          </Grid>
          :
          props.layout === "b" ?
            <Grid display="flex" flex_direction="row-reverse">
              <Grid padding="16px">
                <Text>{props.contents}</Text>
              </Grid>
              <Grid>
                <Image shape="rectangle" src={props.image_url} />
              </Grid>
            </Grid> :
            <Grid display="flex">
              <Grid padding="16px">
                <Text>{props.contents}</Text>
              </Grid>
              <Grid>
                <Image shape="rectangle" src={props.image_url} />
              </Grid>
            </Grid>}



        <Grid padding="16px" is_flex>
          <Text margin="0px" bold>좋아요 {props.like_cnt}개</Text>
          {/* <Favorite onClick={addlike} />
          <FavoriteBorder onClick={delLike} />
          <button onClick={checking}>123123</button> */}
          {likecheck ? <Favorite
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              delLike()
            }} /> : <FavoriteBorder onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addlike()
            }}
          />}
        </Grid>
      </Grid>
    </React.Fragment >
  );
}

Post.defaultProps = {
  user_info: {
    user_name: "mean0",
    user_profile: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
  },
  image_url: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
  contents: "고양이네요!",
  comment_cnt: 10,
  insert_dt: "2021-02-27 10:00:00",
  is_me: false,
};

export default Post;