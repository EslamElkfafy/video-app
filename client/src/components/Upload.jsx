import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../fireBase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: black;
        background-color: #000000b3;
        display: flex;
        justify-content: center;
        align-items: center;
    `;

const Wrapper = styled.div`
        width: 720px;
        height: 720px;
        background-color: ${({ theme }) => theme.bgLighter};
        color: ${({ theme }) => theme.text};
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        position: relative;
    `;

const Close = styled.div`
        position: absolute;
        top: 20px;
        right: 20px;
        cursor: pointer;
        font-size: 1.2rem;
    `;
const Title = styled.h1`
        margin-top: 10px;
        text-align: center;
    `;
const Input = styled.input`
        border: 1px solid ${({ theme }) => theme.soft};
        color: ${({ theme }) => theme.text};
        padding: 10px;
        border-radius: 5px;
        background-color: transparent;
    `;
const Desc = styled.textarea`
        border: 1px solid ${({ theme }) => theme.soft};
        color: ${({ theme }) => theme.text};
        padding: 10px;
        border-radius: 5px;
        background-color: transparent;
    `;
const Button = styled.button`
        border: none;
        background-color: ${({ theme }) => theme.soft};
        color: ${({ theme }) => theme.textSoft};
        cursor: pointer;
        padding: 10px 20px;
        font-weight: 500;
    `;
const Label = styled.div`
        font-size: 14px;
    `;
const Upload = ({setUpload}) => {
    const [inputs, setInputs] = useState({});
    const [img, setImg] = useState(undefined);
    const [video, setVideo] = useState(undefined);
    const [imgPrec, setImgPrec] = useState(0);
    const [videoPrec, setVideoPrec] = useState(0);
    const [tags, setTags] = useState([]);

    const navigate = useNavigate()

    const handeleInput = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
          });
    }
    const handleUpload = async (e) => {
        e.preventDefault();
        console.log(inputs);
        const response = await axios.post("/videos", {...inputs, tags});
        setUpload(false);
        console.log(response.status);
        response.status === 200 && navigate(`/video/${response.data._id}`)
    }
    
    const uploadFile = (file, urlType) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                (urlType === "videoUrl") ? setVideoPrec(Math.round(progress)) : setImgPrec(Math.round(progress));
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => { },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setInputs(previous => ({ ...previous, [urlType]: downloadURL }))
                });
            }
        );
    }

    useEffect(() => {
        video && uploadFile(video, "videoUrl")
    }, [video])
    useEffect(() => {
        img && uploadFile(img, "imgUrl")
    }, [img])
    
    return (
        <Container>
            <Wrapper>
                <Close onClick={() => setUpload(false)}>X</Close>
                <Title>Upload a New Video</Title>
                <Label>Video:</Label>
                {videoPrec > 0 ? ("Uploading: " + videoPrec + "%") : (
                    <Input type='file' accept='video/*' onChange={e => setVideo(e.target.files[0])} />
                )}
                <Input type='text' name='title' placeholder='Title' onChange={handeleInput} />
                <Desc  name='description' placeholder='Description' rows={8} onChange={handeleInput} />
                <Input type='text' placeholder='Separate the tags with commas.' onChange={e => setTags(e.target.value.split(','))} />
                <Label>Image:</Label>
                {imgPrec > 0 ? ("Uploading: " + imgPrec + "%") : (
                    <Input type='file' accept='image/*' onChange={e => setImg(e.target.files[0])} />
                )}
                <Button onClick={handleUpload}>Upload</Button>
            </Wrapper>
        </Container>
    )
}

export default Upload;