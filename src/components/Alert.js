
export default function Alert({ message, type, setValue }) {
    setTimeout(() => {
        // After 3 seconds set the show value to false
        setValue('')
    }, 3000)
    return (
        <>
            <div className={`alert alert--${type}`}>{message}</div>
        </>
    )
}
