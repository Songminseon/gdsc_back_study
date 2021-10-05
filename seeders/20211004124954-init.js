"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert("board_categories", [
      {
        id: 1,
        category_name: "자유게시판",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        category_name: "비밀게시판",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        category_name: "졸업생게시판",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        category_name: "새내기게시판",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 5,
        category_name: "시사 이슈",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 6,
        category_name: "정보게시판",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 7,
        category_name: "HOT 게시물",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 8,
        category_name: "공기업 게시판",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 9,
        category_name: "홍보 게시판",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
    await queryInterface.bulkInsert("users", [
      {
        id: 2,
        user_id: "admin1",
        password:
          "$2b$12$ZXQq2kqHOdeMSDof9YFLt.oYnBLwDh0XzxlojN3e4vv7dnD43Qaqq",
        email: "test@seoultech.ac.kr",
        name: "test",
        nickname: "test",
        major: "gdsc-web",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        user_id: "smsun0329",
        password:
          "$2b$12$ZXQq2kqHOdeMSDof9YFLt.oYnBLwDh0XzxlojN3e4vv7dnD43Qaqq",
        email: "test@seoultech.ac.kr",
        name: "송민선",
        nickname: "송민선",
        major: "gdsc-web",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        user_id: "admin2",
        password:
          "$2b$12$ZXQq2kqHOdeMSDof9YFLt.oYnBLwDh0XzxlojN3e4vv7dnD43Qaqq",
        email: "test2@seoultech.ac.kr",
        name: "test2",
        nickname: "test",
        major: "gdsc-web",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 5,
        user_id: "admin3",
        password:
          "$2b$12$ZXQq2kqHOdeMSDof9YFLt.oYnBLwDh0XzxlojN3e4vv7dnD43Qaqq",
        email: "test3@seoultech.ac.kr",
        name: "test3",
        nickname: "test3",
        major: "gdsc-web",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 6,
        user_id: "admin4",
        password:
          "$2b$12$ZXQq2kqHOdeMSDof9YFLt.oYnBLwDh0XzxlojN3e4vv7dnD43Qaqq",
        email: "test4@seoultech.ac.kr",
        name: "test4",
        nickname: "test4",
        major: "gdsc-web",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 7,
        user_id: "admin5",
        password:
          "$2b$12$ZXQq2kqHOdeMSDof9YFLt.oYnBLwDh0XzxlojN3e4vv7dnD43Qaqq",
        email: "test5@seoultech.ac.kr",
        name: "test5",
        nickname: "test5",
        major: "gdsc-web",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("boards", [
      {
        id: 1,
        title: "gdsc 게시글 첫번 째",
        content: "gdsc 첫번 째 게시글 입니다. 모두들 만나서 반가워요",
        image_url: null,
        is_secret: true,
        like_num: 0,
        comment_num: 3,
        created_at: new Date(),
        updated_at: new Date(),
        user_id: 2,
        board_category_id: 1,
      },
      {
        id: 2,
        title: "react 잘하는 방법",
        content: "그런거 없어요 ㅠㅠ 열심히 하세요.",
        image_url: null,
        is_secret: true,
        like_num: 0,
        comment_num: 2,
        created_at: new Date(),
        updated_at: new Date(),
        user_id: 2,
        board_category_id: 2,
      },
      {
        id: 3,
        title: "던던댄스 던던댄스",
        content: "저스트 댄스`~~ 저스트 댄스~~~ 던던던댄스~~",
        image_url: null,
        is_secret: true,
        like_num: 0,
        comment_num: 0,
        created_at: new Date(),
        updated_at: new Date(),
        user_id: 3,
        board_category_id: 4,
      },
    ]);

    await queryInterface.bulkInsert("comments", [
      {
        id: 1,
        content: "gdsc very good",
        is_secret: true,
        like_num: 0,
        board_id: 1,
        user_id: 6,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        content: "그쵸 gdsc재밌어요",
        is_secret: true,
        like_num: 0,
        board_id: 1,
        user_id: 7,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        content: "아 나도 할걸... ㅠㅠ",
        is_secret: true,
        like_num: 0,
        board_id: 1,
        user_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        content: "개 쌉인정",
        is_secret: true,
        like_num: 2,
        board_id: 2,
        user_id: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 5,
        content: "ㅇㅈ 공감하면 개추",
        is_secret: true,
        like_num: 0,
        board_id: 2,
        user_id: 7,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.bulkDelete("boards", null, {});
    await queryInterface.bulkDelete("board_categories", null, {});
  },
};
