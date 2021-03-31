import styled from "styled-components";
import React, { useState, useRef } from 'react';
import "./modal.css";
import { useDispatch } from 'react-redux';
import { actionCreators as postActions } from "../redux/modules/post"
import { TextField } from '@material-ui/core';
import { Grid, Image, Text, Button } from "../elements";

const Modal = (props) => {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, header, name, id, parent } = props;
    // const [disabled, setDisabled] = useState(false);
    const dispatch = useDispatch();

    // console.log(props)


    const del = () => {
        dispatch(postActions.delPostFB(parent.id));
    }


    return (
        // 모달이 열릴때 openModal 클래스가 생성된다.
        <div className={open ? 'openModal modal' : 'modal'}>
            { open ? (
                <section>
                    <button className="close" onClick={close}> &times; </button>
                    <main>
                        삭제하시겠습니까?
                    </main>
                    <Grid is_flex>
                        <L_B onClick={del}>123</L_B>
                    </Grid>
                </section>
            ) : null}
        </div>
    )
}

const L_B = styled.div`
    width: 50%;
    height: 50vh;
    align-items:center
`

const R_B = styled.div`
width: 50%;
height: 5wh;
`

export default Modal;