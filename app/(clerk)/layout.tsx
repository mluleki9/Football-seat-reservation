import '../styles/css/signin.css'
const ClerkLayout = ({ children } : {children: React.ReactNode}) => {
    return ( 
        <div>
            <div className="container">
                <div className='item'>
                    {children}
                </div>
            </div>
        </div>
    );
}
 
export default ClerkLayout;