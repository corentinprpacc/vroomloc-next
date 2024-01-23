import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type SelectScrollableType = {
  field: any
  placeholder: string
  options: string[]
  disabled?: boolean
}

export function SelectScrollable({
  field,
  placeholder,
  options,
  disabled,
}: SelectScrollableType) {
  return (
    <Select onValueChange={field.onChange} disabled={disabled}>
      <SelectTrigger
        className="w-[280px] bg-black text-white
       "
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((brand, index) => {
            return (
              <SelectItem key={index} value={brand}>
                {brand}
              </SelectItem>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
