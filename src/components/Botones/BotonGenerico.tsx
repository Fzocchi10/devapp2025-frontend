export const BotonGenerico = ({funcion, className, titulo}) => {
    return(
        <>
            <button type="button" className={className} onClick={funcion}>{titulo}</button>
        </>
        
    );
}