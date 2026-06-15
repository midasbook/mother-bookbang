const SHEET_NAME = "출강문의";
const ADMIN_TOKEN = "CHANGE_ME_TO_A_LONG_PRIVATE_TOKEN";

function doPost(e) {
  const sheet = getSheet_();
  const data = parseBody_(e);
  const now = new Date();

  sheet.appendRow([
    now,
    data.organization || "",
    data.name || "",
    data.phone || "",
    data.email || "",
    data.audience || "",
    data.date || "",
    data.message || "",
    data.source || "",
    data.createdAt || ""
  ]);

  return json_({
    ok: true,
    message: "saved"
  });
}

function doGet(e) {
  const params = e.parameter || {};

  if (params.action !== "list" || params.token !== ADMIN_TOKEN) {
    return json_({
      ok: true,
      service: "마더책방 출강문의 접수 API"
    });
  }

  const sheet = getSheet_();
  const values = sheet.getDataRange().getValues();
  const headers = values.shift();
  const rows = values.map((row) =>
    headers.reduce((item, header, index) => {
      item[header] = row[index];
      return item;
    }, {})
  );

  return json_({
    ok: true,
    rows
  });
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "접수시각",
      "기관명",
      "담당자명",
      "연락처",
      "이메일",
      "희망대상",
      "희망일정",
      "문의내용",
      "유입경로",
      "브라우저접수시각"
    ]);
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function parseBody_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    return {};
  }

  try {
    return JSON.parse(e.postData.contents);
  } catch (error) {
    return e.parameter || {};
  }
}

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}
