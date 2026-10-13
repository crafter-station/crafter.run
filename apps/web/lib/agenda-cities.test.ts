import { describe, expect, test } from "bun:test"
import { agendaCity, agendaCityArt } from "./agenda-cities"

describe("agendaCity", () => {
  test("resolves real Luma addresses", () => {
    expect(agendaCity("UTP - Torre Arequipa, Av. Arequipa 265, Lima 15046, Peru")?.code).toBe("LIM")
    expect(agendaCity("Tecsup, José Luis Bustamante 04009, Peru")?.code).toBe("AQP")
    expect(agendaCity("Miraflores, Peru")?.code).toBe("LIM")
    expect(agendaCity("Colo Coffee Usaquen, Cra. 6a #117-26, Usaquén, Bogotá")?.code).toBe("BOG")
    expect(agendaCity("Vedia 3892, C1430CXD Cdad. Autónoma de Buenos Aires, Argentina")?.code).toBe("BUE")
  })
  test("does not guess", () => {
    expect(agendaCity("Plaza La Quadra, Av. Quito y Madrid &, Santo Domingo, Ecuador")).toBeNull()
    expect(agendaCity("UTEC Ventures")).toBeNull()
    expect(agendaCity("")).toBeNull()
  })
  test("every skyline is a 28×12 grid", () => {
    for (const rows of Object.values(agendaCityArt)) {
      expect(rows).toHaveLength(12)
      for (const row of rows) expect(row).toMatch(/^[#+~.]{28}$/)
    }
  })
})
