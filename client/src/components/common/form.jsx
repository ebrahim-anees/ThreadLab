import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';

export default function CommonForm({
  formControls,
  formData,
  setFormData,
  handleSubmit,
  buttonText = 'Submit',
  isBtnDisabled = false,
}) {
  function renderInputByCompType(controlItem) {
    const name = controlItem.name;
    const value = formData[name] || '';
    switch (controlItem.componentType) {
      case 'input':
      default:
        return (
          <Input
            name={name}
            id={name}
            placeholder={controlItem.placeholder}
            type={controlItem.type}
            min={0}
            value={value}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [name]: e.target.value,
              }))
            }
          />
        );
      case 'select':
        return (
          <Select
            onValueChange={(val) =>
              setFormData((prev) => ({ ...prev, [name]: val }))
            }
            value={value}
          >
            <SelectTrigger className="w-full cursor-pointer">
              <SelectValue placeholder={controlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {controlItem?.options.length > 0 &&
                controlItem.options.map((optionItem) => (
                  <SelectItem key={optionItem.id} value={optionItem.id} className='cursor-pointer hover:bg-accent'>
                    {optionItem.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        );
      case 'textarea':
        return (
          <Textarea
            name={name}
            id={name}
            placeholder={controlItem.placeholder}
            value={value}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, [name]: e.target.value }))
            }
          />
        );
    }
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="flex flex-col"
    >
      <div className="flex flex-col gap-3 ">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1 5" key={controlItem.name}>
            <Label className="mb-1">{controlItem.label}</Label>
            {renderInputByCompType(controlItem)}
          </div>
        ))}
      </div>
      <Button
        type="submit"
        className={`mt-7 w-1/2 ml-auto mr-auto ${
          isBtnDisabled ? 'cursor-no-drop opacity-50' : 'cursor-pointer'
        }`}
      >
        {buttonText}
      </Button>
    </form>
  );
}
