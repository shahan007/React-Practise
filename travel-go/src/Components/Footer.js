const githubLink = "https://github.com/shahan007"
const linkedinLink  = "https://www.linkedin.com/in/shahan-alam-71a161206/"
const Footer = ()=>(
    <footer> 
        <a href={linkedinLink} target="_blank" rel='noreferrer'>
            <i className="fa-brands fa-linkedin"></i>
        </a>        
        <a href={githubLink} target="_blank" rel='noreferrer'>
            <i className="fa-brands fa-github-square"/>
        </a>        
    </footer>
)

export default Footer;