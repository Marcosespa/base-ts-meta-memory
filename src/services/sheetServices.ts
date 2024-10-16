import { google } from "googleapis";
import { sheets_v4 } from "googleapis/build/src/apis/sheets";
import { config } from "../config";

class SheetManager {
  private sheets: sheets_v4.Sheets;
  private spreadsheetId: string;

  constructor(spreadsheetId: string, privateKey: string, clientEmail: string) {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        private_key: privateKey,
        client_email: clientEmail,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    this.sheets = google.sheets({ version: "v4", auth });
    this.spreadsheetId = spreadsheetId;
  }

// Función para verificar si un usuario existe
async userExists(number: string): Promise<boolean> {
  try {
    const result = await this.sheets.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: 'Users!A:A',  // Asumiendo que los números de teléfono están en la columna A
    });

    const rows = result.data.values;
    if (rows) {
      const numbers = rows.map(row => row[0]);
      return numbers.includes(number);
    }
    return false;
  } catch (error) {
    console.error("Error al verificar si el usuario existe:", error);
    return false;
  }
}

// Función para crear un usuario y una nueva pestaña
async createUser(number: string, name: string, mail: string): Promise<void> {
  try {
    // Agregar el usuario a la pestaña 'Users'
    await this.sheets.spreadsheets.values.append({
      spreadsheetId: this.spreadsheetId,
      range: 'Users!A:C',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[number, name, mail]],
      },
    });

    // Crear una nueva pestaña con el nombre del número de teléfono
    await this.sheets.spreadsheets.batchUpdate({
      spreadsheetId: this.spreadsheetId,
      requestBody: {
        requests: [
          {
            addSheet: {
              properties: {
                title: number,
              },
            },
          },
        ],
      },
    });

  } catch (error) {
    console.error("Error al crear usuario o nueva pestaña:", error);
  }
}


}





