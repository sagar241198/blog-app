import { TextField } from "@mui/material"

const InputField = ({ label = "", variant = "filled", setFields, fields, field,fieldType='text' }) => {
    const handleChange = (e, fieldName) => {
        const value = e.target.value;
        setFields((pre) => ({
            ...pre,
            [fieldName]: value
        }));
    }
    return (
        <TextField
            margin="normal"
            required
            fullWidth
            variant={variant}
            label={label}
            value={fields[field]}
            onChange={(e) => handleChange(e, field)}
            type={fieldType}
            sx={{
                input: {
                    color: "#fff", // 👈 Input text
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
                label: {
                    color: "#ccc", // 👈 Label color
                },
                "& .MuiFilledInput-root": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)", // 👈 Background of input box
                },
                "& .MuiFilledInput-underline:before": {
                    borderBottomColor: "#aaa", // 👈 Bottom border color
                },
                "& .MuiFilledInput-underline:hover:before": {
                    borderBottomColor: "#fff", // 👈 On hover
                },
                "& .MuiFilledInput-underline:after": {
                    borderBottomColor: "#fff", // 👈 On focus
                },
            }}
        />
    )
}

export default InputField;


export const InputField2 = ({ label = "", variant = "filled", setFields, fields, field }) => {
    const handleChange = (e, fieldName) => {
        const value = e.target.value;
        setFields((pre) => ({
            ...pre,
            [fieldName]: value
        }));
    }
    return (
        <TextField
            margin="normal"
            required
            fullWidth
            variant={variant}
            label={label}
            value={fields[field]}
            onChange={(e) => handleChange(e, field)}
        />
    )
}



