import mockData from "@/services/mockData/feedback.json";

let feedbackData = [...mockData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const feedbackService = {
  async getAll() {
    await delay(300);
    return [...feedbackData];
  },

  async getById(id) {
    await delay(200);
    const feedback = feedbackData.find(item => item.Id === parseInt(id));
    if (!feedback) {
      throw new Error("Feedback not found");
    }
    return { ...feedback };
  },

  async create(feedbackItem) {
    await delay(400);
    
    const newId = Math.max(...feedbackData.map(item => item.Id)) + 1;
    const newFeedback = {
      Id: newId,
      satisfaction: feedbackItem.satisfaction,
      easeOfUse: feedbackItem.easeOfUse,
      nps: feedbackItem.nps,
      timestamp: new Date().toISOString(),
      sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
    
    feedbackData.push(newFeedback);
    return { ...newFeedback };
  },

  async update(id, updatedData) {
    await delay(350);
    
    const index = feedbackData.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Feedback not found");
    }
    
    feedbackData[index] = { ...feedbackData[index], ...updatedData };
    return { ...feedbackData[index] };
  },

  async delete(id) {
    await delay(250);
    
    const index = feedbackData.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Feedback not found");
    }
    
    const deleted = feedbackData.splice(index, 1)[0];
    return { ...deleted };
  }
};