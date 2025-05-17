import React, { useRef, useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import ReportService from '../services/ReportService';
import { useAlert } from '../helper/AlertProvider';

function Report() {
    const [isOpen, setIsOpen] = useState(false)
    const [content, setContent] = useState("")
    const { showAlert } = useAlert();
    const reportRef = useRef(null);


    const Form = async (e) => {
        e.preventDefault()
        if (content === "") return showAlert("Lütfen bir şey yazın", false)
        const formData = new FormData()
        formData.append("content", content)
        const response = await ReportService.Add(formData)
        reportRef.current.value = "";
        setContent("")
        if (!response.status) {
            return showAlert("Bir hata oluştu", false)
        }
        setIsOpen(false)
        showAlert(response.message, true)
    }
    return (
        <>
            <button id='report-btn' onClick={() => setIsOpen(!isOpen)}>Bildir</button>

            <form id='report-container' onSubmit={Form} className={isOpen ? 'active' : ''}>
                <h5>Bir Sorun bildir<IoCloseSharp onClick={() => setIsOpen(false)} /></h5>
                <label className='label'>
                    Merhaba 👋  Bir hata mı buldunuz? Lütfen sorunu aşağıda açıklayın.
                    <textarea ref={reportRef} placeholder='Yanlış giden şey nedir?' onInput={(e) => setContent(e.target.value)} />
                </label>
                <button className='button'>Gönder</button>
            </form>
        </>
    )
}

export default Report


