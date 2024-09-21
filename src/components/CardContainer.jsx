export default function CardContainer({titulo, children}) {
    return(
        <>
        <div>
            <h1>{titulo}</h1>
            <div className="flex gap-4">
                {children}
            </div>
        </div>
 
        </>
    )
}