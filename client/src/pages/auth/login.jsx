import CommonForm from '@/components/common/form';
import { formControls } from '@/config';
import { setInitialFormData } from '@/lib/utils';
import { loginUser } from '@/store/auth/authSlice';
import { toastStyles } from '@/utils/toastStyles';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
export default function AuthLogin() {
  const [formData, setFormData] = useState(
    setInitialFormData(formControls.slice(1, formControls.length - 1))
  );
  const dispatch = useDispatch();
  async function handleSubmit() {
    const action = await dispatch(loginUser(formData));
    const res = action.payload;

    if (res?.success) {
      toast(res.msg, {
        duration: 4000,
        style: toastStyles.SUCCESS,
      });
    } else {
      toast.error(res?.errors?.[0].msg || res?.msg || 'Login failed', {
        duration: 4000,
        style: toastStyles.ERROR,
      });
    }
  }
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account{' '}
          <Link
            className="font-medium text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={formControls.slice(1, formControls.length - 1)}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        buttonText={'Sign In'}
      />
    </div>
  );
}
