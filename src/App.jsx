import "./App.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

function App() {
  const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    email: yup.string().email().required("Email is required"),
    age: yup
      .number("Age must be a number")
      .positive("Age must be a positive number")
      .required("Age is required"),
    password: yup
      .string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
        "Password must contain at least 6 characters, including uppercase, lowercase, number, and special characters"
      )
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="app-container">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <fieldset>
          <legend>Your Details</legend>
        
          <div className="form-group">
          
            <br/> 
            <label htmlFor="username">Username input</label>
            <input type="text" placeholder="Enter your username" id="username" {...register("username", { required: true })} />
            {errors.username && <p className="error">{errors.username.message}</p>}
          </div>
          <br/>
          <div className="form-group">
            
            
            <label htmlFor="email">Email Input:</label>
            <input type="text" id="email"  placeholder="Enter your email" {...register("email", { required: true })} />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>
          
          <div className="form-group">
          
            <br/>
            <label htmlFor="age">  Age Input:</label>
            <input type="number" id="age" placeholder="Enter your age" {...register("age", { required: true })} />
            {errors.age && <p className="error">{errors.age.message}</p>}
          </div>
          <br/>
          <div className="form-group">
           
            
            <label htmlFor="password"> Password Input:</label>
            <input type="password" id="password"   placeholder="Enter your password" {...register("password", { required: true })} />
            {errors.password && <p className="error">{errors.password.message}</p>}
          </div>
          <br/>
          <div className="form-group">
           
        
            <label htmlFor="confirmPassword"> Confirm Input:</label>
            <input type="password" id="confirmPassword"  placeholder="Confirm your password" {...register("confirmPassword", { required: true })} />
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword.message}</p>
            )}
            
          </div>
          <br/>
          <button type="submit" className="submit-button">Submit</button>
        </fieldset>
    

      </form>
    </div>   
          );
}

export default App;
