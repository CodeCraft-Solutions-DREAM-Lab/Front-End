function TextField( {value, onChange} ) {
    return (
        <input 
            className="text-field"
            value={value} 
            onChange={onChange}
        />
            
        
    );
}

export default TextField;