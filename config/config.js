module.exports = {
  noteFolder: '/mnt/microsd/ext4/qsync-notes/',
  //template: './note-template/note-new.odt'

  editor: null,
  enableRenameWatch: true,

  // 已經Docker化，請固定不要動
  template: {
    note: './note-template/note-new.note.docx',
    sheet: './note-template/sheet-new.note.xlsx',
  }
}