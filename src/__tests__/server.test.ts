import server, { connectDB } from "../server"
import db from "../config/db"


jest.mock("../config/db")
 
describe("conecDB", () => {
    it("should handle database conection error", async () => {
        jest.spyOn(db, "authenticate").mockRejectedValueOnce(new Error("hubo un error al conectar la BD"))
        const consoleSpy = jest.spyOn(console, "log")
        await connectDB()
        expect(consoleSpy).toHaveBeenCalledWith (
            expect.stringContaining("hubo un error al conectar la BD")
        )
    })
})