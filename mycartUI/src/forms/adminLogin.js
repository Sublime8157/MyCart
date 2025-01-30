import React, {useState} from "react";
import ErrorDisplay from "../components/errorDisplay"
const adminLogin = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    })
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      }; 
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState([])
    const [revealPassword, setRevealPassword] = useState(false); 

    const togglePassword = () => {
        revealPassword ? setRevealPassword(false) : setRevealPassword(true)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            const response = await fetch('http://localhost:5000/admin/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

           const result = await response.json()
           if(response.status === 200) {
            if(result.status === "error") {
                setError([result])
            } else {
                console.log("Successfully logged in");
            }
           }
        } catch (err) {
            console.error(err)
        } finally{
            setIsLoading(false)
        }
        
    }
   return (
    
    <div className="items-center justify-center flex h-screen w-screen">
        <div className={`absolute z-40 h-screen bg-gray-100 opacity-70 w-screen flex items-center justify-center ${isLoading ? "" : "hidden"}`}>
            <div className="loader">
            </div>
        </div>
        {/* login container */}
        <div className="bg-gray-100 flex items-start rounded p-4 gap-2 flex-col shadow-sm w-4/12">
            <h4 className="font-bold text-xl">Login</h4>
            <div className={`p-2 bg-red-200 rounded w-full text-xs border border-red-400 text-gray-600 ${error.length > 0 ? "block" : "hidden"}`}>
                {error.map((err, index) => {
                    return (
                        <div key={index}>{err.message}</div>
                    )
                })}
            </div>
            <form className="w-full flex gap-4 p-2 flex-col" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username" className="text-sm">Username:</label>
                    <input type="text" className="w-full p-2" name="username" id="username" onChange={handleChange} value={formData.username} required></input>
                </div>
                <div className="relative">
                    <label htmlFor="password" className="text-sm">Password:</label>
                    <input type={revealPassword ? "text" : "password"} className="w-full p-2" name="password" id="password" onChange={handleChange} value={formData.password} required></input>
                    <span className="absolute right-3 bottom-1 cursor-pointer" onClick={() => togglePassword()}><ion-icon name={revealPassword ? "eye-outline" : "eye-off-outline"}></ion-icon></span> 
                </div>
                <div>
                    <button type="submit" className="hover:opacity-70 shadow-sm w-full bg-blue-500 text-white py-2 px-4 rounded">Login</button>
                </div>
            </form>
        </div>
    </div>
   )
}

export default adminLogin;