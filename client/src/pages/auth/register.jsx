import CommonForm from '@/components/common/form';
import { formControls } from '@/config';
import { setInitialFormData } from '@/lib/utils';
import { registerUser } from '@/store/auth/authSlice';
import { toastStyles } from '@/utils/toastStyles';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
export default function AuthRegister() {
  const [formData, setFormData] = useState(setInitialFormData(formControls));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleFormSubmit() {
    dispatch(registerUser(formState)).then((action) => {
      const res = action.payload;
      if (res?.success) {
        toast(res.msg, {
          duration: 4000,
          style: toastStyles.SUCCESS,
        });
        navigate('/auth/login');
      } else {
        toast.error(
          res?.errors?.[0]?.msg || res?.msg || 'Registration failed',
          {
            duration: 4000,
            style: toastStyles.ERROR,
          }
        );
      }
    });
  }
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account{' '}
          <Link
            className="font-medium text-primary hover:underline"
            to="/auth/login"
          >
            login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={formControls}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleFormSubmit}
        buttonText={'Sign Up'}
      />
    </div>
  );
}
