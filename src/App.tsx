import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

//STYLE
import './App.css'

interface IFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  password: number;
  confirmPassword: number;
}

const schema = yup.object({
  firstName: yup.string().required("Имя обязательное поле!"), //ТЕСТ СООБЩЕНИЮ
  lastName: yup.string().required("Фамилия обязательное поле!"),
  email: yup.string().email().required(),
  age: yup.number().positive().integer().required().max(3),
  password: yup.string().min(8).max(15).required(),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
}).required();

export default function App() {
  const { 
    register, 
    handleSubmit, 
    formState: { 
      errors 
    } 
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  });
  const onSubmit = (data: IFormInputs) => console.log(data);

  return (
    <div className='App'>
      <div className="Form">
        <div className="title">Sign Up</div>
        <div className="inputs">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register('email')}
              type="text"
              name="firstName"
              placeholder="First Name..."
            />
            <p className='errors'> {errors.firstName?.message} </p>
            <input
              {...register('lastName')}
              type="text"
              name="lastName"
              placeholder="Last Name..."
            />
            <p className='errors'> {errors.lastName?.message} </p>
            <input
              {...register('email')}
              type="text"
              name="email"
              placeholder="Email..."
            />
            <p className='errors'> {errors.email?.message} </p>
            {/* AGE */}
            <input type="text" name="age" placeholder="Age..." />
            <p className='errors'> {errors.age?.message} </p>
            
            {/* PASSWORD */}
            <input
              {...register('password')}
              type="password"
              name="password"
              placeholder="Password..."
            />
            <p className='errors'> {errors.password?.message} </p>

            {/* PASSWORD CONFIRM */}
            <input
              {...register('confirmPassword')}
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password..."
            />
            <p className='errors'> {errors.confirmPassword && "Passwords Should Match!"} </p>

            <input type="submit" id="submit" />
          </form>
        </div>
      </div>
    </div>
  );
}