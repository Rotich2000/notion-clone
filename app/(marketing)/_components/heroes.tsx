import Image from "next/image"

const Heroes = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
        <div className="flex items-center">
            <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px]">
                <Image
                alt="documents"
                src="/images/documents.png"
                fill
                className="object-contain dark:hidden"
                />
                <Image
                alt="documents"
                src="/images/documents-dark.png"
                fill
                className="object-contain hidden dark:block"
                />
            </div>
            <div className="relative hidden md:block w-[400px] h-[400px]">
                <Image
                alt="reading"
                src="/images/reading.png"
                fill
                className="object-contain dark:hidden"
                />
                <Image
                alt="reading"
                src="/images/reading-dark.png"
                fill
                className="object-contain hidden dark:block"
                />
            </div>
        </div>
    </div>
  )
}

export default Heroes