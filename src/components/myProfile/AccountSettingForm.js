import { useEffect, useState } from "react"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useFetch } from "../../hooks/useFetch"
import Alert from "../Alert"
import { FaSpinner } from 'react-icons/fa'


export default function AccountSettingForm() {
    const { user, dispatch } = useAuthContext()
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [isUpdated, setIsUpdated] = useState(false)
    const [image, setImage] = useState({ preview: '', data: '' })


    const { updateData, data, error, isPending, setError } = useFetch('http://localhost:3000/api/v1/users/update_my_data', 'PATCH')
    const handleSubmit = async (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('photo', image.data)
        formData.append('name', name)
        formData.append('email', email)
        updateData(formData, 'formData')

    }

    useEffect(() => {
        if (data) {
            setIsUpdated(true)
            dispatch({ type: 'UPDATE_USER', payload: data.data.updatedUser })
        }
    }, [data])

    const handleFileChange = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        setImage(img)
    }
    return (
        <div className='user-view__form-container' >
            <h2 className='heading-secondary ma-bt-md'>Your account settings</h2>
            <form className='form.form-user-data' onSubmit={handleSubmit}>
                <div className='form__group'>
                    <label className='form__label' htmlFor='name'>Name</label>
                    <input
                        id='name'
                        className='form__input'
                        type='text'
                        defaultValue={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='form__group'>
                    <label className='form__label' htmlFor='email'>Email Address</label>
                    <input id='email' className='form__input' type='email' defaultValue={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='form__group form__photo-upload'>
                    {image.preview ? <img className='form__user-photo' src={image.preview} alt='User' />
                        : <img className='form__user-photo' src={`http://localhost:3000/img/users/${user.photo}`} alt='User' />}

                    <input className='form__upload' id='photo' name='photo'
                        onChange={handleFileChange}
                        type='file' accept='image/*' />
                    <label htmlFor='photo'>Choose new photo</label>
                </div>
                <div className='form__group right'>
                    <button className='btn btn--small btn--blue'>{isPending ? <FaSpinner /> : 'Save settings'}</button>
                </div>
            </form>
            {isUpdated && <Alert type='success' setValue={setIsUpdated} message='Data updated successfully' />}
            {error && <Alert type='error' setValue={setError} message={error} />}
        </div>
    )
}