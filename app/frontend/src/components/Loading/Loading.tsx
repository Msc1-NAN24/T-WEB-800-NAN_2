'use client';

import Lottie from "lottie-react";
import loading from '../../../public/animations/loading.json';

export type LoadingProps = {

}

export default function LoadingPage({}: LoadingProps) {

  return (
    <Lottie width={200} height={200} className={"w-60 h-60 m-auto"} animationData={loading} loop autoPlay>

    </Lottie>
  )
}