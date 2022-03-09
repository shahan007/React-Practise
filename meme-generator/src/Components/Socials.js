const githubLink = "https://github.com/shahan007"
const linkedinLink = "https://www.linkedin.com/in/shahan-alam-71a161206/"

const Socials = () => (
    <div class="icon-bar">
        <a className="linkedin" href={linkedinLink} target="_blank" rel='noreferrer'>
            <i className="fa-brands fa-linkedin-in"></i>
        </a>
        <a className="github" href={githubLink} target="_blank" rel='noreferrer'>
            <i className="fa-brands fa-github" />
        </a>
    </div>
)

export default Socials;