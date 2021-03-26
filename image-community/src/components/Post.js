import React from "react";
import {Grid,Image,Text} from "../elements/index";

const Post = (props) => {
  return (
    <React.Fragment>
      <Grid>
        <Grid is_flex>
          <Image shape="circle" src={props.src} />
          <Text bold>{props.user_info.user_name}</Text>
          <Text>{props.insert_dt}</Text>
        </Grid>
        <Grid padding="16px">
          <Text>{props.contents}</Text>
        </Grid>
        <Grid>
          <Image shape="rectangle" src={props.src} />
        </Grid>
        <Grid padding="16px">
          <Text bold>댓글 {props.comment_cnt}개</Text>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Post.defaultProps = {
  user_info: {
    user_name: "hoon",
    user_profile:
      "https://images.unsplash.com/photo-1615714734821-e0671ec65ef7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&ixlib=rb-1.2.1&q=80&w=1920",
  },
  img_url:
    "https://images.unsplash.com/photo-1615714734821-e0671ec65ef7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&ixlib=rb-1.2.1&q=80&w=1920",
  contents: "이미지",
  comment_cnt: 10,
  insert_dt: "2021-03-26 10:00:00",

};

export default Post;
