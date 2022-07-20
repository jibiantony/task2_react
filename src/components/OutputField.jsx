const OutputField = ({
    label,
    value = "",
}) => {
    console.log("value",label,value);
    return (
        <div className="input-field">
            <div className="input-field-container">
                <label htmlFor="" name=""> { label }: { value}</label>
            </div>
        </div>
    );
}

export default OutputField;