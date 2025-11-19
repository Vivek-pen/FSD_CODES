import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.sql.*;

public class AppController extends HttpServlet {

    Connection con;
    public void init() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            con = DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/testdb", "root", "Welcome@1234$");
        } catch(Exception e) { e.printStackTrace(); }
    }

    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        String type = req.getParameter("type");
        PrintWriter out = res.getWriter();

        if (type.equals("register")) {
            registerUser(req, out);
        } else if (type.equals("login")) {
            loginUser(req, out);
        }
    }

    private void registerUser(HttpServletRequest req, PrintWriter out) {
        try {
            PreparedStatement ps = con.prepareStatement(
                "INSERT INTO users(name,email,password) VALUES(?,?,?)"
            );
            ps.setString(1, req.getParameter("name"));
            ps.setString(2, req.getParameter("email"));
            ps.setString(3, req.getParameter("pass"));
            ps.executeUpdate();

            out.println("Registration Successful!");
        } catch(Exception e) { out.println("Error: " + e.getMessage()); }
    }

    private void loginUser(HttpServletRequest req, PrintWriter out) {
        try {
            PreparedStatement ps = con.prepareStatement(
                "SELECT * FROM users WHERE email=? AND password=?"
            );
            ps.setString(1, req.getParameter("email"));
            ps.setString(2, req.getParameter("pass"));

            ResultSet rs = ps.executeQuery();

            if (rs.next())
                out.println("Login Successful!");
            else
                out.println("Invalid Login!");
        } catch(Exception e) { out.println("Error: " + e.getMessage()); }
    }
}
