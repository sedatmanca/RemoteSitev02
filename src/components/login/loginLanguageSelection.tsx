import { LanguageSelection } from "@/components/navbar/buttons";
import { ILangugageDropdownProps } from "@/types/navbar/navbarProps";

const LoginLanguageSelection = ({ translation, path }: ILangugageDropdownProps) => {
    return(
        <div className="bg-white absolute top-0 right-0 w-[50px] h-[30px] rounded-bl-2xl">
            <LanguageSelection
                className="text-center"
                translation={translation}
                path={path}
            />
        </div>
    )
}

export default LoginLanguageSelection;