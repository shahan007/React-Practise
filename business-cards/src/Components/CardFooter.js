const SocialIconSource = {
    "Twitter" : "Images/TwitterIcon.png",
    "Facebook" : "Images/FacebookIcon.png",
    "Instagram" : "Images/InstagramIcon.png",
    "GitHub" : "Images/GitHubIcon.png",
}

const CardFooter = ({socials}) => (
    <div className="card-footer">
        {
            socials.map(
                (social,index) => {
                    const socialKey = Object.keys(social)[0];                    
                    return (
                        <a href={social[socialKey].link} key={index} target="_blank" rel="noreferrer">
                            <img src={SocialIconSource[socialKey]} alt={socialKey} />
                        </a>
                    )
                }                
            )
        }
    </div>    
)

export default CardFooter