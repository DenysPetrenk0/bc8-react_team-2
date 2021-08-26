import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { getTaskModalVisible } from '../../../redux/taskModal/taskModalSelector';
import { hideTaskModal } from '../../../redux/taskModal/taskModalAction';
import TaskImageInput from '../taskImageInput/TaskImageInput';
import TaskInput from '../taskInput/TaskInput';
import Modal from '../../modal/Modal';
import ModalClose from '../../modal/modalClose/ModalClose';
import image from '../modalTaskImg.webp';
import styles from './NewTaskModal.module.css';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Task is required'),
  reward: Yup.number().required('Points is required'),
});

const NewTaskModal = ({ onAddTask, onClose }) => {
  const form = useFormik({
    initialValues: {
      imageUrl: '',
      title: '',
      reward: '',
    },
    validationSchema,
    onSubmit: values => {
      onAddTask(values);
    },
  });

  const imageUrl = useMemo(
    () =>
      !form.values.imageUrl ? '' : URL.createObjectURL(form.values.imageUrl),
    [form.values.imageUrl],
  );

  const { t } = useTranslation();

  return (
    <Modal onClose={onClose}>
      <ModalClose onClose={onClose} />
      <form
        onSubmit={form.handleSubmit}
        className={styles.newTaskModalContainer}
      >
        <img className={styles.taskImage} src={imageUrl || image} alt="task" />
        <TaskImageInput
          value={form.values.imageUrl}
          onChange={file => {
            form.setFieldValue('imageUrl', file);
          }}
        />
        <TaskInput
          name="title"
          value={form.values.title}
          onChange={form.handleChange}
          type="text"
          placeholder={
            (form.touched.title && t(form.errors.title)) || t('Add task')
          }
          hasError={form.errors.title && form.touched.title}
        />
        <TaskInput
          name="reward"
          value={form.values.reward}
          onChange={form.handleChange}
          type="number"
          placeholder={
            (form.touched.reward && t(form.errors.reward)) || t('Add points')
          }
          hasError={form.errors.reward && form.touched.reward}
        />
        <div className={styles.taskButtonContainer}>
          <button type="submit" className={styles.taskButton}>
            {t('Ok')}
          </button>
        </div>
      </form>
    </Modal>
  );
};

const NewTaskModalContainer = ({ onAddTask }) => {
  const modalVisible = useSelector(getTaskModalVisible);
  const dispatch = useDispatch();
  const onClose = useCallback(() => {
    dispatch(hideTaskModal());
  }, [dispatch]);
  if (!modalVisible) return null;
  return <NewTaskModal onAddTask={onAddTask} onClose={onClose} />;
};

export default NewTaskModalContainer;
