export default function Footer() {
    return (
      <footer style={{ backgroundColor: "#333", color: "#fff", padding: "20px", textAlign: "center" }}>
        <div>
          <p>© {new Date().getFullYear()} Your Company Name. All Rights Reserved.</p>
          <nav>
            <a href="/about" style={{ margin: "0 10px", color: "#fff" }}>About</a>
            <a href="/contact" style={{ margin: "0 10px", color: "#fff" }}>Contact</a>
            <a href="/privacy" style={{ margin: "0 10px", color: "#fff" }}>Privacy Policy</a>
          </nav>
        </div>
      </footer>
    );
  }
  