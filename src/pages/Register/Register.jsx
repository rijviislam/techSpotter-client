import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

export default function Register() {
  const { createUser, updateImageAndName, setReload, setLoader } = useAuth();
  const [regError, setRegError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, password, image } = data;
    setLoader(true);

    try {
      const result = await createUser(email, password);
      console.log(result);

      await updateImageAndName(name, image);

      setReload((prev) => !prev);

      navigate("/");
      reset();
    } catch (error) {
      setRegError(error.message);
      if (regError) {
        Swal.fire({
          title: "Can't Register with this email and password!",
          showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `,
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `,
          },
        });
      }
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="flex w-full gap-5 items-center justify-center my-10 md:px-7">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-[#6C63FF] text-gray-100">
        <h1 className="text-2xl font-bold text-center">Register Now!</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate=""
          action=""
          className="space-y-6"
        >
          <div className="space-y-1 text-sm">
            <label htmlFor="name" className="block text-gray-100">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-md border-gray-700 dark:border-gray-300 bg-gray-900 dark:bg-gray-50 text-black focus:border-violet-400 focus:dark:border-violet-600"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="space-y-1 text-sm">
            <label htmlFor="email" className="block text-gray-100">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-md border-gray-700 dark:border-gray-300 bg-gray-900 dark:bg-gray-50 text-black focus:border-violet-400 focus:dark:border-violet-600"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="space-y-1 text-sm">
            <label htmlFor="imageurl" className="block text-gray-100">
              Image
            </label>
            <input
              type="url"
              name="image"
              id="imageurl"
              placeholder="Enter an Image URL"
              className="w-full px-4 py-3 rounded-md border-gray-700 dark:border-gray-300 bg-gray-900 dark:bg-gray-50 text-black focus:border-violet-400 focus:dark:border-violet-600"
              {...register("image", { required: true })}
            />
            {errors.image && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="space-y-1 text-sm">
            <label htmlFor="password" className="block text-gray-100">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-md border-gray-700 dark:border-gray-300 bg-gray-900 dark:bg-gray-50 text-black focus:border-violet-400 focus:dark:border-violet-600"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <button className="block w-full p-3 text-center rounded-sm text-gray-900 dark:text-gray-50 bg-[#423e68]">
            Register
          </button>
        </form>

        <p className="text-xs pt-5 text-center sm:px-6 text-gray-100">
          Have an account?
          <Link to="/login" className="underline text-gray-100">
            Login up
          </Link>
        </p>
      </div>
    </div>
  );
}
