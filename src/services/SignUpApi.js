import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const signUpApi = createApi({
  reducerPath: "signUpApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/admin/",
    // baseUrl: "https://global-education-t.onrender.com/api/admin/",
    prepareHeaders: (headers) => {
      const authToken = localStorage.getItem("authToken");
      if (authToken) {
        headers.set("Authorization", `Bearer ${authToken}`);
        console.log("sign", authToken);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // register: builder.mutation({
    //   query: (user) => {
    //     return {
    //       url: "registerAdmin",
    //       method: "POST",
    //       body: user,
    //       headers: {
    //         "Content-type": "application/json",
    //       },
    //     };
    //   },
    // }),
    login: builder.mutation({
      query: (user) => {
        return {
          url: "loginAdmin",
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    sendNotification: builder.mutation({
      query: (user) => {
        return {
          url: "sendNotification",
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    getAdmin: builder.query({
      query: () => {
        return {
          url: "admin",
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    getNotification: builder.query({
      query: () => {
        return {
          url: "notifications",
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    getPendingUpdationRequest: builder.query({
      query: () => {
        return {
          url: "pendingUpdationRequest",
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    getRaiseFund: builder.query({
      query: () => {
        return {
          url: "raiseFundForApproval",
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),

    approvalStatus: builder.mutation({
      query: (user) => {
        const { id, ...data } = user;
        console.log("user", id);
        return {
          url: `approvalStatus/${id}`,
          method: "POST",
          body: data,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    getAcceptedRaiseFund: builder.query({
      query: () => {
        return {
          url: "acceptedRaiseFund",
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    getRejectedRaiseFund: builder.query({
      query: () => {
        return {
          url: "rejectedRaiseFund",
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),

    addRejectUpdationRequest: builder.mutation({
      query: (user) => {
        const updateDetailId = user.updateDetailId;
        console.log("user", updateDetailId);
        return {
          url: `rejectUpdationRequest/${updateDetailId}`,
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    addAcceptUpdationRequest: builder.mutation({
      query: (user) => {
        const updateDetailId = user.updateDetailId;
        console.log("user", updateDetailId);
        return {
          url: `acceptUpdationRequest/${updateDetailId}`,
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),

    getOpenDonarData: builder.query({
      query: () => {
        return {
          url: "publicDonarData",
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),

    addAssignRaiseFundToDonar: builder.mutation({
      query: (user) => {
        return {
          url: `assignRaiseFundToDonar`,
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),

    getStudentProfile: builder.query({
      query: () => {
        return {
          url: "allStudentProfile",
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),

    getDonarProfile: builder.query({
      query: () => {
        return {
          url: "allDonars",
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),

    getSearchDonarByName: builder.query({
      query: ({ name }) => {
        return {
          url: "searchDonar",
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
          params: {
            name: name,
          },
        };
      },
    }),

    getStudentProfileById: builder.query({
      query: (studentUID) => {
        return {
          url: `studentProfile/${studentUID}`,
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),

    getStudentCourseById: builder.query({
      query: (studentUID) => {
        return {
          url: `studentCourse/${studentUID}`,
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    getStudentAccountById: builder.query({
      query: (studentUID) => {
        return {
          url: `studentAccount/${studentUID}`,
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),

    deleteCourseDocument: builder.mutation({
      query: (id) => ({
        url: `deleteCourseDocument/${id}`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),

    deletePreviousAccount: builder.mutation({
      query: (id) => ({
        url: `deletePreviousAccountDetails/${id}`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),

    getQRCode: builder.query({
      query: (studentUID) => {
        return {
          url: `qRCode/${studentUID}`,
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),

    addCourse: builder.mutation({
      query: (user) => {
        return {
          url: `addAdminCourse`,
          method: "POST",
          body: user,
        };
      },
    }),

    updateCourse: builder.mutation({
      query: (user) => {
        const { id, ...data}=user;
        console.log(id)
        return {
          url: `updateAdminCourse/${id}`,
          method: "PUT",
          body: data,
         
        };
      },
    }),

    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `deleteAdminCourse/${id}`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),

    addLesson: builder.mutation({
      query: (user) => {
        return {
          url: `addAdminLesson`,
          method: "POST",
          body: user,
        };
      },
    }),

    updateLesson: builder.mutation({
      query: (user) => {
        const { id, ...data}=user;
        console.log(id)
        return {
          url: `updateAdminLesson/${id}`,
          method: "PUT",
          body: data,
         
        };
      },
    }),

    deleteLesson: builder.mutation({
      query: (id) => ({
        url: `deleteAdminLesson/${id}`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),

    getAdminCourse: builder.query({
      query: () => {
        return {
          url: `getAdminCourse`,
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),

    getLesson: builder.query({
      query: (adminCourseId) => {
        return {
          url: `getLessons/${adminCourseId}`,
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),

    getDonar: builder.query({
      query: (id) => {
        return {
          url: `donar/${id}`,
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),

    getRaiseFundAssignToDonar: builder.query({
      query: (id) => {
        return {
          url: `findAllRaiseFundAssignToDonar/${id}`,
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),

    deleteRaiseFundFromDonar: builder.mutation({
      query: (requestData) => {
        // console.log(requestData);
        const url = `removeRaiseFund/${requestData.raiseFundId}`;
        const queryParams = new URLSearchParams({
          donarId: requestData.donarId,
        }).toString();
        return {
          url: `${url}?${queryParams}`,
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),

    getAllRejectedRaiseFund: builder.query({
      query: (id) => {
        return {
          url: `getAllRejectedRaiseFundByDonar/${id}`,
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),

    getDonationHistory: builder.query({
      query: (id) => {
        return {
          url: `donationHistory/${id}`,
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),

    getDonationHistoryForAll: builder.query({
      query: () => {
        return {
          url: `donationHistory`,
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),

    getAllStudent: builder.query({
      query: () => {
        return {
          url: `countAllStudent`,
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),

    getAllDonar: builder.query({
      query: () => {
        return {
          url: `countAllDonar`,
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),

    getDashboardRaiseFund: builder.query({
      query: () => {
        return {
          url: `countAllRaiseFund`,
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),

    getDashboardTodayStudent: builder.query({
      query: () => {
        return {
          url: `countTodayStudent`,
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    getDashboardTodayDonar: builder.query({
      query: () => {
        return {
          url: `countTodayDonar`,
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    getDashboardTodayRaiseFund: builder.query({
      query: () => {
        return {
          url: `countTodayRaiseFund`,
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),

    updateCourseImage: builder.mutation({
      query: (user) => {
        const id = user.get('id');
        return {
          url: `updateCourseImage/${id}`,
          method: "PUT",
          body: user,
        };
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useSendNotificationMutation,
  useGetAdminQuery,
  useGetNotificationQuery,
  useGetPendingUpdationRequestQuery,
  useGetRaiseFundQuery,
  useApprovalStatusMutation,
  useGetAcceptedRaiseFundQuery,
  useGetRejectedRaiseFundQuery,
  useAddRejectUpdationRequestMutation,
  useAddAcceptUpdationRequestMutation,
  useGetOpenDonarDataQuery,
  useAddAssignRaiseFundToDonarMutation,
  useGetStudentProfileQuery,
  useGetDonarProfileQuery,
  useGetSearchDonarByNameQuery,
  useGetStudentProfileByIdQuery,
  useGetStudentCourseByIdQuery,
  useGetStudentAccountByIdQuery,
  useDeleteCourseDocumentMutation,
  useDeletePreviousAccountMutation,
  useGetQRCodeQuery,
  useAddCourseMutation,
  useAddLessonMutation,
  useGetAdminCourseQuery,
  useGetLessonQuery,
  useGetDonarQuery,
  useGetRaiseFundAssignToDonarQuery,
  useDeleteRaiseFundFromDonarMutation,
  useGetAllRejectedRaiseFundQuery,
  useGetDonationHistoryQuery,
  useGetDonationHistoryForAllQuery,
  useGetAllStudentQuery,
  useGetAllDonarQuery,
  useGetDashboardRaiseFundQuery,
  useGetDashboardTodayStudentQuery,
  useGetDashboardTodayDonarQuery,
  useGetDashboardTodayRaiseFundQuery,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
  useUpdateCourseImageMutation
} = signUpApi;
