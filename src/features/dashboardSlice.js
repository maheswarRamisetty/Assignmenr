import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [
    {
      id: 1,
      name: 'CSPM Executive Dashboard',
      widgets: [
        { id: 1, name: 'Widget 1', content: 'Content for Widget 1', selected: false },
        { id: 2, name: 'Widget 2', content: 'Content for Widget 2', selected: false },
      ],
    },
    {
      id: 2,
      name: 'Another Category',
      widgets: [
        { id: 3, name: 'Widget 3', content: 'Content for Widget 3', selected: false },
      ],
    },
  ],
  searchTerm: '',
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    addWidget: (state, action) => {
      const { categoryId, widget } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        category.widgets.push({ ...widget, id: Date.now(), selected: false });
      }
    },
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        category.widgets = category.widgets.filter(widget => widget.id !== widgetId);
      }
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    toggleWidgetSelection: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        const widget = category.widgets.find(w => w.id === widgetId);
        if (widget) {
          widget.selected = !widget.selected;
        }
      }
    },
    removeSelectedWidgets: (state) => {
      state.categories = state.categories.map(category => ({
        ...category,
        widgets: category.widgets.filter(widget => !widget.selected)
      }));
    },
    extraReducers: (builder) => {
      builder.addCase(addWidget, (state, action) => {
        const { categoryId, widgetId } = action.payload;
        const category = state.categories.find(c => c.id === categoryId);
        const widget = category.widgets.find(w => w.id === widgetId);
        if (widget && !widget.selected) {
          widget.selected = true;
        }
      });
    },
  },
});

export const { 
  addWidget, 
  removeWidget, 
  setSearchTerm, 
  toggleWidgetSelection, 
  removeSelectedWidgets,
  extraReducers
} = dashboardSlice.actions;

export default dashboardSlice.reducer;