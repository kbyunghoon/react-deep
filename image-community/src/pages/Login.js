import React, { useEffect, useState } from "react";
import { Text, Input, Grid, Button } from "../elements"
import { getCookie, setCookie } from "../shared/Cookie"
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user"
import { emailCheck } from "../shared/common";


const Login = (props) => {
    const dispatch = useDispatch();

    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');

    const login = () => {

        console.log(id);

        if (id === "" || pwd === "") {
            window.alert("아이디 혹은 비밀번호가 공란입니다! 입력해주세요!");
            return;
        }

        if (!emailCheck(id)) {
            window.alert("이메일 형식이 맞지 않습니다!");
            return;
        }

        dispatch(userActions.loginFB(id, pwd));
    };

    return (
        <React.Fragment>
            <Grid padding="16px">
                <Text size="32px" bold>
                    로그인
                </Text>
                <Grid padding="16px 0px">
                    <Input
                        label="아이디"
                        placeholder="아이디를 입력해주세요."
                        _onChange={(e) => {
                            setId(e.target.value);
                        }}
                    />
                </Grid>
                <Grid padding="16px 0px">
                    <Input
                        type="password"
                        label="패스워드"
                        placeholder="패스워드를 입력해주세요."
                        _onChange={(e) => {
                            setPwd(e.target.value);
                        }}
                    />
                </Grid>
                <Button text="로그인하기"
                    _onClick={() => {
                        login();
                    }}
                ></Button>
            </Grid>
        </React.Fragment>
    )
}

export default Login;