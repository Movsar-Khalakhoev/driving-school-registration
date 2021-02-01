import s from './FunctionalitiesController.module.sass'
import { useState, useEffect, useContext } from 'react'
import useHttp from '../../../../hooks/http.hook'
import AuthContext from '../../../../context/AuthContext'
import Loader from '../../../../components/Loader/Loader'
import Table from '../Table/Table'

const FunctionalitiesController = () => {
  const [functionalities, setFunctionalities] = useState([])
  const [roles, setRoles] = useState([])
  const [changedCells, setChangedCells] = useState([])
  const {
    loading: functionalitiesLoading,
    request: functionalitiesRequest,
  } = useHttp()
  const { loading: rolesLoading, request: rolesRequest } = useHttp()
  const { loading: changesLoading, request: changesRequest } = useHttp()
  const { token } = useContext(AuthContext)

  const toggleCells = ({ functionalityId, roleId }) => {
    const roleIndex = roles.findIndex(role => role._id === roleId)
    const permissionIndex = roles[roleIndex].permissions.findIndex(
      permission => permission === functionalityId
    )

    if (permissionIndex === -1) {
      const clonedRoles = [...roles]
      clonedRoles[roleIndex].permissions.push(functionalityId)
      setRoles(clonedRoles)
    } else {
      const clonedRoles = [...roles]
      clonedRoles[roleIndex].permissions = [
        ...clonedRoles[roleIndex].permissions.slice(0, permissionIndex),
        ...clonedRoles[roleIndex].permissions.slice(permissionIndex + 1),
      ]
      setRoles(clonedRoles)
    }
  }

  useEffect(() => console.log(changedCells), [changedCells])

  const fetchChangesHandler = async () => {
    await changesRequest(
      '/api/settings/functionality/change-functionalities',
      'POST',
      {
        changes: changedCells,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    )
  }

  const getTableHeadLabels = () => {
    return roles.map(({ label }) => label)
  }

  const getTableRows = () => {
    return functionalities.map(functionality => {
      return {
        title: Object.keys(functionality.components)[0],
        cells: roles.map(role => ({
          isActiveView: role.permissions.includes(functionality._id),
          isButton: true,
          isUserInfo: false,
          data: {
            roleId: role._id,
            functionalityId: functionality._id,
          },
        })),
      }
    })
  }

  useEffect(() => {
    functionalitiesRequest(
      '/api/settings/functionality/all-functionalities',
      'GET',
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    ).then(res => setFunctionalities(res.data.functionalities))
    rolesRequest('/api/general/all-roles', 'GET', null, {
      Authorization: `Bearer ${token}`,
    }).then(res => setRoles(res.data.roles))
  }, [])

  return (
    <div className={s.functionalities}>
      <h2 className='settings_header'>Таблица функциональностей</h2>
      <Table
        isLoading={functionalitiesLoading || rolesLoading}
        head={getTableHeadLabels()}
        rows={getTableRows()}
        changeItemsState={toggleCells}
        changedCells={changedCells}
        setChangedCells={setChangedCells}
      />
      <button
        className={`${s.save} btn_1`}
        onClick={fetchChangesHandler}
        disabled={changesLoading}
      >
        {changesLoading ? <Loader width={20} /> : 'Сохранить'}
      </button>
    </div>
  )
}

export default FunctionalitiesController
