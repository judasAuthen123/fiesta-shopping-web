import React, { useContext, useEffect, useState } from 'react'
import styles from './ImageFrom.module.css'
import { RiUpload2Fill } from "react-icons/ri";
import { defaultAvt } from '../../../../../public/components/image/DefaultIAvt';
import CircleLoading from './../../../../../public/components/loading/CircleLoading';
import AxiosInstance from '../../../../../../util/AxiosInstance';
import { AppContext } from '../../../../../../util/AppContext';
import { useTranslation } from 'react-i18next';
import DoubleCircleLoading from '../../../../../public/components/loading/doubleCircleLoading/DoubleCircleLoading';
export default function ImageForm({ isVisible, onClose, onOpenSuccessDialog }) {
    const { t } = useTranslation()
    const [selectedFiles, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false)
    const { dataUser, setDataUser } = useContext(AppContext)
    const isImageFile = (file) => {
        return file && file['type'].split('/')[0] === 'image';
    };
    const selectedImg = () => {
        if (preview)
            return preview
        return dataUser?.image?.url ? dataUser.image.url : defaultAvt
    }
    useEffect(() => {
        if (!isVisible) {
            setSelectedFile(null);
            setPreview(null);

        }
    }, [isVisible]);

    // chọn ảnh từ thiết bị
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const size = event.target.files[0]?.size
        const sizeMB = (size / (1024 * 1024)).toFixed(2)
        if (sizeMB > 5) {
            alert('File size maximum is 5 MB')
            return false
        }
        if (!file) {
            return false;
        }
        if (isImageFile(file)) {
            setSelectedFile(file);
            const filePreview = URL.createObjectURL(file);
            setPreview(filePreview);
        } else {
            alert("Bạn chỉ được phép chọn file ảnh!");
            setSelectedFile(null);
            setPreview("");
        }
    };


    // upload ảnh mới
    const handleFileInput = () => {
        document.getElementById('fileInput').click()
    }
    if (!isVisible) return null

    const updateUser = async (e) => {
        e.preventDefault()
        if (!selectedFiles) {
            alert('Please select any image to update')
        }
        let updateData = {
            // trường muốn sửa name,phoneNumber, userName ...
        };
        const data = new FormData();
        if (selectedFiles !== null) {
            data.append('images', selectedFiles);
            updateData = { ...updateData, image: { url: selectedFiles.name, id: dataUser.image ? dataUser.image.id : "" } }
        }
        data.append("updateFields", JSON.stringify(updateData));
        try {
            setLoading(true)
            const response = await AxiosInstance.post(`userApi/updateUser/${dataUser?._id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                },
            })
            if (response.result) {
                const user = JSON.parse(localStorage.getItem('user'))
                user.image = response.data.image
                localStorage.setItem('user', JSON.stringify(user))
                setDataUser(user)
                onClose(false)
                setLoading(false)
                onOpenSuccessDialog(true)
            }
        } catch (error) {
            console.log("UPDATE ERROR: ", error);
        }
    }
    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={updateUser}>
                <div className={styles.viewImg}>
                    <img src={selectedImg()} alt={`Preview`} />
                    <div className={styles.iconView} onClick={handleFileInput}>
                        <RiUpload2Fill />
                    </div>
                </div>
                <div className={styles.noteImg}>
                    <p>
                    {t('Components.avatar.size')}
                    </p>
                    <p>
                    {t('Components.avatar.extension')}
                    </p>
                </div>
                <input id='fileInput' type="file" onChange={handleFileChange} accept="image/*" multiple />
                <div className={styles.viewButton}>
                    <button onClick={() => onClose(false)}>
                    {t('Components.avatar.button.btnCancel')}
                    </button>
                    <button type='submit'>
                        {
                            loading ? <DoubleCircleLoading 
                            width={23} height={23} 
                            spin1Color={'#333232'} 
                            spin2Color={'black'}
                            spin1Width={11}
                            spin1Height={11}
                            /> : t('Components.avatar.button.btnSubmit')
                        }
                    </button>
                </div>

            </form>
        </div>
    )
}
