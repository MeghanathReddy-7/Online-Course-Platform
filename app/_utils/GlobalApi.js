const { gql, default: request } = require("graphql-request");
const { Gentium_Plus } = require("next/font/google");

const MASTER_URL =
  "https://api-ap-south-1.hygraph.com/v2/" +
  process.env.NEXT_PUBLIC_HYGRAPH_API_KEY +
  "/master";

const getAllCourseList = async () => {
  const query = gql`
    query MyQuery {
      courseLists(first: 20, orderBy: createdAt_DESC) {
        author
        name
        id
        description
        demoUrl
        free
        chapter {
          ... on Chapter {
            id
            name
            vedio {
              url
            }
          }
        }
        banner {
          url
        }
        totalChapters
        tag
        slug
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};
const getsideBanner = async () => {
  const query = gql`
    query GetSideBanner {
      sideBanners {
        id
        name
        banner {
          id
          url
        }
        url
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const getAnnouncementsSideBanner = async () => {
  const query = gql`
    query MyQuery {
      announcementsSidebanners {
        id
        name
        banner {
          id
          url
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};
const getCourseById = async (courseId) => {
  const query =
    gql`
  query MyQuery {
  courseList(where: {slug: "` +
    courseId +
    `"}) {
    author
    banner {
      url
    }
    chapter {
      ... on Chapter {
        id
        name
        vedio {
          url
        }
      }
    }
    demoUrl
    description
    free
    id
    name
    slug
    tag
    totalChapters
  }
}

`;
  const result = await request(MASTER_URL, query);
  return result;
};

const enrollToCourse = async (courseId, email) => {
  const query =
    gql`mutation MyMutation {
  createUserEnrollCourse(
    data: {courseId: "` +
    courseId +
    `", userEmail: "` +
    email +
    `", courseList: {connect: {slug: "` +
    courseId +
    `"}}}
  ) {
    id
  }
    publishManyUserEnrollCoursesConnection {
    edges {
      node {
        id
      }
    }
  }
}
`;
  const result = await request(MASTER_URL, query);
  return result;
};

const checkUserEnrolledToCourse = async (courseId, email) => {
  const query =
    gql`query MyQuery {
  userEnrollCourses(where: {courseId: "` +
    courseId +
    `", userEmail: "` +
    email +
    `"}) {
    id
  }
}
`;
  const result = await request(MASTER_URL, query);
  return result;
};

const getUserEnrolledCourseDetails = async (id, email) => {
  const query =
    gql`query MyQuery {
  userEnrollCourses(where: {id: "` +
    id +
    `", userEmail: "` +
    email +
    `"})
     {
    courseId
    id
    userEmail
    completedChapter {
      ... on CompletedChapter {
        id
        chapterId
      }
    }
    courseList {
      author
      banner {
        url
      }
      chapter {
        ... on Chapter {
          id
          name
          shortDesc
          vedio {
            url
          }
        }
      }
      demoUrl
      description
      free
      id
      totalChapters
      slug
      name
    }
  }
}
`;
  const result = await request(MASTER_URL, query);
  return result;
};

const markChapterCompleted = async (enrolledId, chapterId) => {
  const query =
    gql`
  mutation MyMutation { 
  updateUserEnrollCourse(
    data: {completedChapter: {create: {CompletedChapter: {data: {chapterId: "` +
    chapterId +
    `"}}}}}
    where: {id: "` +
    enrolledId +
    `"}
  )
  {
    id
  }
  publishUserEnrollCourse(where: {id: "` +
    enrolledId +
    `"}) {
    id
  }
}
`;
  const result = await request(MASTER_URL, query);
  return result;
};

const getUserAllEnrolledCourseList = async (email) => {
  const query =
    gql`
    query MyQuery {
  userEnrollCourses(where: {userEmail: "` +
    email +
    `"}) {
    completedChapter {
      ... on CompletedChapter {
        id
        chapterId
      }
    }
    courseId
    courseList {
      id
      name
      totalChapters
      slug
      free
      description
      demoUrl
      chapter (first:50){
        ... on Chapter {
          id
          name
        }
      }
      author
      banner {
        url
      }
    }
  }
}

`;
  const result = await request(MASTER_URL, query);
  return result;
};

const addNewMember = async (email, paymentId) => {
  const query =
    gql`mutation MyMutation {
  createMembership(data: {active:true, email: "` +
    email +
    `", paymentId: "` +
    paymentId +
    `"}) {
    id
  }
    publishManyMemberships(to: PUBLISHED) {
    count
  }
}

`;
  const result = await request(MASTER_URL, query);
  return result;
};


const checkForMembership = async (email) => {
  const query =
    gql`query MyQuery {
  memberships(where: {email: "`+email+`"}) {
    email
    id
    paymentId
    createdAt
  }
}
`;
  const result = await request(MASTER_URL, query);
  return result;
};


export default {
  getAllCourseList,
  getsideBanner,
  getCourseById,
  enrollToCourse,
  checkUserEnrolledToCourse,
  getUserEnrolledCourseDetails,
  getAnnouncementsSideBanner,
  markChapterCompleted,
  getUserAllEnrolledCourseList,
  addNewMember,
  checkForMembership,
};
