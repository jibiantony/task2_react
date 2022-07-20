const SelectField = ({ label, options, handleChange, name, value }) => {
    return (
        <div className="input-field">
            <div className="input-field-container">
                <label htmlFor="" name="">{ label }</label>
                <select onChange={e => handleChange(e.target.value)} name={name} value={value}>
                    {options.map(option => <option key={option.label} value={option.value}>{ option.label }</option>)}
                </select>
            </div>
        </div>
    );
}

export default SelectField;