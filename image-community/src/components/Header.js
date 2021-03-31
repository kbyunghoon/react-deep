import React, { useEffect, useState } from "react";
import { Grid, Text, Button, Image } from "../elements";
import { deleteCookie, getCookie } from "../shared/Cookie";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user"
import { history } from "../redux/configureStore"
import { apiKey } from "../shared/firebase";
import Permit from "../shared/Permit";
import logobg from "./logo.png"
import styled from "styled-components"

const Header = () => {
    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);

    const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
    const is_session = sessionStorage.getItem(_session_key) ? true : false;
    console.log(is_session);
    if (is_login && is_session) {
        return (
            <Permit>
                <React.Fragment>
                    <Grid is_flex padding="4px 16px">
                        <Logo onClick={() => {
                            history.push('/')
                        }}
                        />
                        <Grid is_flex>
                            <Button text="내정보"></Button>
                            <Button _onClick={() => {
                                history.push("/noti");
                            }} text="알림"></Button>
                            <Button text="로그아웃" _onClick={() => {
                                dispatch(userActions.logoutFB());
                            }}
                            ></Button>
                        </Grid>
                    </Grid>
                </React.Fragment>
            </Permit>
        )
    }




    return (
        <React.Fragment>
            <Grid is_flex padding="4px 16px">
                <Logo onClick={() => {
                    history.push('/')
                }}
                />
                <Grid is_flex width="40%">
                    <Button text="로그인" _onClick={() => {
                        history.push('/login');
                    }}></Button>
                    <Button text="회원가입" _onClick={() => {
                        history.push('/signup');
                    }}></Button>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

Header.defaultProps = {

}


const Logo = styled.div`
    background-image: url("${logobg}");
    width:30vh;
    height:10vh;
    background-size:cover;
    background-position: center
`

export default Header;