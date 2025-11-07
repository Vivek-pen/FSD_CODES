import java.io.*;
import java.sql.*;
import javax.servlet.*;
import javax.servlet.http.*;


public class StudentController extends HttpServlet {
    Connection con;

    public void init() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/studentdb", "root", "Welcome@1234$");
        } catch (Exception e) { e.printStackTrace(); }
    }

    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException {
        try (PreparedStatement ps = con.prepareStatement("INSERT INTO student VALUES(?,?,?)")) {
            ps.setInt(1, Integer.parseInt(req.getParameter("id")));
            ps.setString(2, req.getParameter("name"));
            ps.setInt(3, Integer.parseInt(req.getParameter("age")));
            ps.executeUpdate();
            res.getWriter().println("Inserted!");
        } catch (Exception e) { res.getWriter().println(e); }
    }

    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException {
        try (Statement st = con.createStatement();
             ResultSet rs = st.executeQuery("SELECT * FROM student")) {
            PrintWriter out = res.getWriter();
            while (rs.next()) out.println(rs.getInt(1)+" "+rs.getString(2)+" "+rs.getInt(3));
        } catch (Exception e) { res.getWriter().println(e); }
    }

    public void destroy() { try { con.close(); } catch (Exception ignored) {} }
}
