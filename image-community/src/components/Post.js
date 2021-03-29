import React from "react";
import { Grid, Image, Text } from "../elements/index";

const Post = (props) => {
  return (
    <React.Fragment>
      <Grid>
        <Grid is_flex>
          <Grid is_flex width="auto">
            <Image shape="circle" src={props.src} />
            <Text bold>{props.user_info.user_name}</Text>
          </Grid>
          <Text>{props.insert_dt}</Text>
        </Grid>
        <Grid padding="16px">
          <Text>{props.contents}</Text>
        </Grid>
        <Grid>
          <Image shape="rectangle" src={props.src} />
        </Grid>
        <Grid padding="16px">
          <Text margin="0px" bold>댓글 {props.comment_cnt}개</Text>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Post.defaultProps = {
  user_info: {
    user_name: "hoon",
    user_profile:
      "https://cdn.discordapp.com/attachments/578800402036949002/825716597414035517/e.jpg",
  },
  image_url:
    "https://cdn.discordapp.com/attachments/578800402036949002/825716597414035517/e.jpg",
  contents: "이미지",
  comment_cnt: 10,
  insert_dt: "2021-03-26 10:00:00",
};

export default Post;
