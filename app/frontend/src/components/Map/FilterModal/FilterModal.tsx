import Modal, {ModalProps} from "@/components/Modals/Modal";
import {useForm} from "react-hook-form";
import Image from "next/image";

export type FilterForm = {
  price: {
    enable: boolean;
    value: number;
  };
  open: boolean;
}

export type FilterProps = {
  onValid: (data: FilterForm) => void;
} & ModalProps;

export default function FilterModal(props: FilterProps) {

  const {watch, setValue} = useForm<FilterForm>({defaultValues: {price: {enable: false, value: 0}, open: false}});

  return (
    <Modal open={props.open}>
      <div className={"flex flex-col gap-6"}>
        <p className={"text-2xl"}>Filtre</p>
        <div>
          <p>Prix</p>
          <p className={"text-xs"}>Limite les résultats aux lieux situés dans la fourchette spécifiée. Les valeurs valables vont de 0 (le plus abordable) à 4 (le plus cher), inclus. Le montant exact indiqué par une valeur spécifique varie d'une région à l'autre.</p>
          <div className={"flex flex-row gap-4 mt-2"}>
            {[0, 1, 2, 3, 4].map((i) => {
              return (
                <Image key={`select-price-${i}`} onClick={() => setValue('price.value', i)} className={`p-2 rounded-3xl ${watch('price.value') < i ? 'bg-gray-300' : 'bg-green-400'} cursor-pointer`} src={'/icons/price.svg'} alt={'price' + i} width={40} height={40}/>
              )
            })}
          </div>
        </div>
        <div>
          <div className={"flex flex-row gap-4"}>
            <span className={"toggle"} onClick={(event) => {
            }}/>
            <p>Renvoie uniquement les lieux ouverts</p>
          </div>
        </div>
        <div className={"flex flex-row gap-4"}>
          <button className={"btn rounded-2xl btn-primary w-fit"}>Valider</button>
          <button className={"btn rounded-2xl w-fit"} onClick={props.onDismiss}>Fermer</button>
        </div>
      </div>
    </Modal>)
}