interface NullDataProps {
    title: string
}

const NotAllowed = ({title}: NullDataProps) => {

  return (
    <main className="w-full h-[50vh] flex items-center justify-center text-xl md:text-2xl">
        <p className="font-medium">{title}</p>
    </main>
  )
}

export default NotAllowed